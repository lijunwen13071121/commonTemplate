<template>
  <div class="question-item">
    <p class="question">{{ itemIndex+1 }}、【单选】{{ questionItem.qustTitle }}</p>
    <div
      v-for="(option, index) in options"
      :key="option.value||index"
      :class="[
        'question-option',
        `${submited ? (option.value === questionItem.checkedAnswer ? (questionItem.correct ? 'right' : 'error'): '') : (option.value === questionItem.checkedAnswer ? 'checked' : '')}`,
        `${submited && option.value !== questionItem.checkedAnswer && questionItem.trueAnswer === option.value ? 'right' : ''}`
      ]"
      @click="checked(option.value)"
    >
      <div class="option">
        {{ index | fromCharCode }}.{{ option.label }}
      </div>
      <img
        v-if="submited && (questionItem.checkedAnswer === option.value) && questionItem.correct"
        class="right-icon state-icon"
        :src="require('@/assets/right_icon.png')"
      >
      <img
        v-else-if="submited && (option.value === questionItem.checkedAnswer)"
        class="state-icon state-icon"
        :src="require('@/assets/error_icon.png')"
      >
    </div>
    <div v-show="submited" class="true-answer">正确答案：{{ trueAnswer }}</div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionItem',
    filters: {
      fromCharCode(i) {
        return String.fromCharCode(i + 65)
      }
    },
    props: {
      itemIndex: {
        type: Number,
        default: 1
      },
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
            trueAnswer: {
              type: String,
              default: ''
            },
            checkedAnswer: {
              type: String,
              default: ''
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
        // 不能直接修改props
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
        const index = this.options.findIndex(item => item.value === this.questionItem.trueAnswer)
        return String.fromCharCode(index + 65)
      }
    },
    methods: {
      checked(value) {
        // const examable = this.$store.state.exam.examable
        // if (!examable) {
        //   return Toast({
        //     message: '当前为预览模式，不能选择！'
        //   })
        // }
        if (!this.submited) {
          this.questionItem.checkedAnswer = value
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
  //width: 1.6rem;
  height: 0.3rem;
  // margin-right: 0.rem;
}
.true-answer{
  text-align: left;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
</style>
