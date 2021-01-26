<template>
  <div>
    <!-- <a href="require('@/assets/test.pdf')">src\assets\test.pdf</a> -->
    <canvas v-show="!img" id="pdf-canvas" class="pdf-canvas" />
    <img v-if="img" :src="img" style="width: 100%">
    <button @click="drawCanvas">截图</button>
  </div>
</template>
<script>
  import * as pdfjsLib from 'pdfjs-dist'
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
  import html2canvas from 'html2canvas'
  function parseValue(value) {
    return parseInt(value, 10)
  }
  const PIXEL_RATIO = (() => {
    const ctx = document.createElement('canvas').getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1
    return dpr / bsr
  })()
  export default {
    data() {
      return {
        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        scale: 0.9,
        img: ''
      }
    },
    mounted() {
      this.showPDF('/test.pdf')
    },
    methods: {
      showPDF(url) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
        const loadingTask = pdfjsLib.getDocument(url)
        loadingTask.promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const scaledViewport = page.getViewport({ scale: 10 })
            const canvas = document.getElementById('pdf-canvas')
            const context = canvas.getContext('2d')
            canvas.height = scaledViewport.height
            canvas.width = scaledViewport.width
            const renderContext = {
              canvasContext: context,
              viewport: scaledViewport
            }
            canvas.style.height = scaledViewport.height * PIXEL_RATIO
            canvas.style.width = scaledViewport.width * PIXEL_RATIO
            const renderTask = page.render(renderContext)
            renderTask.promise.then(() => {
            })
          })
        }, reason => {
          console.error(reason)
        })
      },
      drawCanvas() {
        this.screenShot = true
        this.$nextTick(() => {
          // 获取想要转换的 DOM 节点
          const dom = document.getElementById('pdf-canvas')
          const box = window.getComputedStyle(dom)
          // DOM 节点计算后宽高
          const width = parseValue(box.width)
          const height = parseValue(box.height)
          // 获取像素比
          // 创建自定义 canvas 元素
          const canvas = document.createElement('canvas')
          canvas.fillStyle = '#FFFFFF'
          // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
          canvas.width = width * 1.5
          canvas.height = height * 1.5
          // 设定 canvas css宽高为 DOM 节点宽高
          canvas.style.width = `${width}px`
          canvas.style.height = `${height}px`

          html2canvas(dom, {
            canvas,
            allowTaint: true,
            scale: 1.5,
            logging: true // 日志开关，便于查看html2canvas的内部执行流程
          }).then((canvas) => {
            this.img = dom.toDataURL('image/jpeg', 1)
            this.hidebox = true
            document.querySelector('body').removeAttribute('class', 'fixed')
          })
        })
      }
    }
  }
</script>
<style scoped>
  .pdf-canvas{
    width: 100%;
  }
</style>
