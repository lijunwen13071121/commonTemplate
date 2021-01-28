<template>
  <div class="question-item">
    <p class="question">{{ itemIndex+1 }}、【多选】{{ questionItem.qustTitle }}</p>
    <div class="question-options" />
    <div
      v-for="(option, index) in options"
      :key="option.value||index"
      :class="[
        'question-option',
        `${submited ? 
          (questionItem.correct ? (questionItem.checkedAnswer.indexOf(option.value) >= 0 ? 'right' : '') : 
            (questionItem.checkedAnswer.indexOf(option.value) >= 0 && questionItem.trueAnswer.indexOf(option.value) === -1 ? 'error' : '')): 
          (questionItem.checkedAnswer.indexOf(option.value) >= 0 ? 'checked' : '')}`,
        `${submited && option.value !== questionItem.checkedAnswer && questionItem.trueAnswer.indexOf(option.value) > -1 ? 'right' : ''}`
      ]"
      @click="checked(option.value)"
    >
      <div class="option">
        {{ index | fromCharCode }}.{{ option.label }}
      </div>
      <img
        v-if="submited && questionItem.trueAnswer.indexOf(option.value) > -1 && (questionItem.checkedAnswer.indexOf(option.value) >= 0)"
        class="right-icon state-icon"
        :src="require('@/assets/right_icon.png')"
      >
      <img
        v-else-if="submited && (questionItem.trueAnswer.indexOf(option.value) === -1) && (questionItem.checkedAnswer.indexOf(option.value) >= 0)"
        class="state-icon state-icon"
        :src="require('@/assets/error_icon.png')"
      >
    </div>
    <div v-show="submited" class="true-answer">正确答案：<span v-for="item in trueAnswer" :key="item">{{ item }} </span></div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionItemMultiple',
    filters: {
      /**
       * @todo 生成选项的abcd序列号
       * @param { String } i 选项的索引
       */
      fromCharCode(i) {
        return String.fromCharCode(i + 65)
      }
    },
    props: {
      itemIndex: {
        type: Number,
        default: 1
      },
      // 题目是否已经提交，从而显示状态
      submited: {
        type: Boolean,
        default: false
      },
      questionItem: {
        type: Object,
        default() {
          return {
            id: {
              type: String,
              default: ''
            },
            qustTitle: {
              type: String,
              default: ''
            },
            options: {
              type: Array,
              default() {
                return []
              }
            },
            answer: {
              type: Array,
              default: []
            },
            checkedAnswer: {
              type: Array,
              default: []
            }
          }
        }
      }
    },
    computed: {
      /**
       * @todo 打乱选项顺序
       */
      options() {
        const newOptions = []
        this.questionItem.options.forEach(option => {
          newOptions.push(option)
        })
        const allIndex = newOptions.findIndex(item => {
          return item.label.indexOf('以上都') > -1
        })
        if (allIndex > -1) {
          const allItem = newOptions[allIndex]
          newOptions.splice(allIndex, 1)
          const allList = newOptions.sort((a, b) => {
            return Math.random() > 0.5 ? -1 : 1
          })
          allList.push(allItem)
          return allList
        } else {
          return newOptions.sort((a, b) => {
            return Math.random() > 0.5 ? -1 : 1
          })
        }
        // return this.questionItem.options
      },
      trueAnswer() {
        const trueAnswers = []
        for (let i = 0; i < this.options.length; i++) {
          const option = this.options[i]
          if (this.questionItem.trueAnswer.indexOf(option.value) >= 0) {
            trueAnswers.push(String.fromCharCode(i + 65))
          }
        }
        return trueAnswers
      }
    },
    methods: {
      checked(value) {
        if (!this.submited) {
          const checkedAnswer = this.questionItem.checkedAnswer
          const answerIndex = checkedAnswer.indexOf(value)
          if (answerIndex < 0) {
            checkedAnswer.push(value)
          } else {
            checkedAnswer.splice(answerIndex, 1)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.question-item {
  width: 100%;
  font-size: 0.28rem;
}
.question {
  margin-bottom: 0.12rem;
  font-family: PingFangSC-Medium;
  line-height: 0.4rem;
  text-align: left;
}
.question-option {
  margin-bottom: 0.1rem;
  width: 100%;
  min-height: 0.8rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  border-radius: 0.08rem;
  background-color:rgba(0,145,255,0.14);
  position: relative;
  &.checked,
  &.right {
    background-color: rgba(0,145,255,0.60);
    color: #ffffff;
  }
  &.error {
    background-color: #FF9898;
    color: #ffffff;
  }
  .option{
    width: calc(100% - 1rem);
    line-height: 0.4rem;
    text-align: left;
    word-wrap: break-word;
  }
}
.state-icon {
  height: 0.3rem;
}
.true-answer{
  text-align: left;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
</style>
