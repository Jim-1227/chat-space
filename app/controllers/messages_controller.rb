class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)

    if (@message.content == "") && (@message.image.file == nil)
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end

    @message.save
    
    respond_to do |format|
      format.html
      format.json
    end

  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id, created_at: DateTime.now)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
