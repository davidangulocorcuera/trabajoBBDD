export default {
  data() {
    return {
      agentProfile: {
        teamName: 'david',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      },
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false
    }
  },
  methods: {
    sendMessage (msg) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.messageList.push(msg)
      }
    },
    onMessageWasSent (msg) {
      this.messageList.push(msg)
    },
    openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      this.isChatOpen = false
    }
  }
}
