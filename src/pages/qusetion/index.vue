<template>
  <div class="list-wrapper">
    <div class="body">
      <div class="rule">规则说明：每日首次答题，在10分钟内得分60分以上即可参与抽奖</div>
      <div class="label">题目：</div>
      <template v-for="(item, index) in qusetionList">
        <question-item
          v-if="item.type === 10" 
          :key="item.id" 
          :item-index="index" 
          :submited="submited" 
          :question-item="item" 
        />
        <multiple-chouce
          v-else
          :key="item.id" 
          :item-index="index"
          :submited="submited"
          :question-item="item"
        />
      </template> 
    </div>
    <div class="foot">
      <div class="button" @click="submit">{{ !submited ? '提交' : pass ? '完成' : '重新答题' }}</div>
    </div>
  </div>
</template>
<script>
  import QuestionItem from './components/questionItem'
  import MultipleChouce from './components/multipleChoice'
  import { Toast, Dialog } from 'vant'
  
  export default {
    name: 'QusetionList',
    components: { QuestionItem, MultipleChouce },
    data() {
      return {
        submited: false,
        examId: '',
        startTime: null,
        pass: false,
        resultShow: false,
        result: 'fail',
        awardNames: [],
        show: false,
        qusetionList: []
      }
    },
    mounted() {
      this.qusetionList = [
        {
          id: '1',
          qustTitle: '题目一',
          type: 10,
          trueAnswer: 'A',
          checkedAnswer: '',
          options: [{
            label: '选项A',
            value: 'A'
          }, {
            label: '选项B',
            value: 'B'
          }, {
            label: '选项C',
            value: 'C'
          }, {
            label: '选项D',
            value: 'D'
          }]
        },
        {
          id: 2,
          qustTitle: '题目一',
          type: 20,
          checkedAnswer: [],
          trueAnswer: ['A', 'B'],
          options: [{
            label: '选项A',
            value: 'A'
          }, {
            label: '选项B',
            value: 'B'
          }, {
            label: '选项C',
            value: 'C'
          }, {
            label: '选项D',
            value: 'D'
          }, {
            label: '选项E',
            value: 'E'
          }]
        }
      ]
    },
    methods: {
      submit() {
        const list = this.qusetionList
        for (let i = 0; i < list.length; i++) {
          if (!list[i].checkedAnswer) {
            return Dialog({
              title: '系统提示',
              message: `第${i + 1}题未答，请完成答题！`
            })
          }
        }
        const params = {
          examId: this.examId,
          userAnswerLogs: [{
            answerLogs: list.map(item => {
              const answerLog = {
                answerId: item.id,
                userAnswer: item.type === 10 ? item.checkedAnswer : item.checkedAnswer.sort().join(',')
              }
              return answerLog
            })
          }]
        }
        this.submited = true
        console.log(params)
      },
      start(startRotate, release) {
        startRotate(4)
      },
      showPrize(done) {
        this.show = false
        Toast('完成！')
      },
      restart() {
        this.submited = false
        this.resultShow = false
        this.qusetionList.forEach(item => {
          if (item === 10) {
            item.checkedAnswer = ''
          } else {
            item.checkedAnswer = []
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .list-wrapper{
    width: 100vw;
    height: 100vh;
    overflow-x: scroll;
    .body{
      padding: 0.3rem 0.3rem 0 0.3rem;
      box-sizing: border-box;
      .title{
        margin-bottom: 0.18rem;
        text-align: center;
        font-size: 0.32rem;
      }
      .rule{
        margin-bottom: 0.3rem;
        line-height: 0.37rem;
        text-align: left;
        font-size: 0.26rem;
      }
      .label{
        height: 0.28rem;
        padding-left: 0.12rem;
        border-left: 0.04rem solid #0091FF;
        font-size: 0.28rem;
        line-height: 0.28rem;
        text-align: left;
      }
    }
    .foot{
      bottom: 0;
      position: fixed;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 0.7rem;
      margin-bottom: 0.3rem;
      width: 100%;
      .button{
        width: 3.6rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        background-color: #0091FF;
        font-size: 0.36rem;
        line-height: 0.8rem;
        color: #fff;
      }
    }
  }
</style>
