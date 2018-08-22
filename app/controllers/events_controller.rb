class EventsController < ApplicationController

  def index
    respond_to do |format|
      format.html
      format.json do
        start_date  = Date.parse(params[:start_date]) rescue nil
        end_date    = Date.parse(params[:end_date]) rescue nil
        if start_date && end_date
          events  = Event.between(start_date, end_date)
                      .ordered
                      .group_by do |event|
                        event.start_at.to_date
                      end
          render json: events
        else
          head :bad_request
        end
      end
    end
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render json: event.error.full_messages, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :start_at, :end_at)
  end

end
