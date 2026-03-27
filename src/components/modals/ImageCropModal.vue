<template>
  <div v-if="show" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-[#333]/40 backdrop-blur-sm transition-opacity" @click="cancel"></div>

    <!-- Modal Content -->
    <div class="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div class="flex flex-col">
           <h3 class="text-[16px] sm:text-[18px] font-black text-[#333]">Recortar Imagem</h3>
           <span class="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Ajuste o enquadramento desejado</span>
        </div>
        <button @click="cancel" class="p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-all">
          <X :size="20" />
        </button>
      </div>
 
      <!-- Cropper Container -->
      <div class="p-4 sm:p-6 bg-gray-50/50">
        <div class="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center min-h-[250px] sm:min-h-[300px] max-h-[500px]">
          <img ref="imageElement" :src="imageSrc" class="max-w-full block" />
        </div>
      </div>
 
      <!-- Controls & Actions -->
      <div class="px-5 sm:px-8 py-5 sm:py-6 bg-white border-t border-gray-100">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          <!-- Zoom Controls -->
          <div class="flex items-center gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 w-full sm:w-auto justify-center sm:justify-start">
             <button @click="zoom(0.1)" class="p-2.5 sm:p-2 rounded-lg hover:bg-white hover:text-[#005858] transition-all text-gray-400 shadow-sm">
                <ZoomIn :size="20" />
             </button>
             <button @click="zoom(-0.1)" class="p-2.5 sm:p-2 rounded-lg hover:bg-white hover:text-[#005858] transition-all text-gray-400 shadow-sm">
                <ZoomOut :size="20" />
             </button>
             <button @click="rotate(-90)" class="p-2.5 sm:p-2 rounded-lg hover:bg-white hover:text-[#005858] transition-all text-gray-400 shadow-sm">
                <RotateCcw :size="20" />
             </button>
          </div>
 
          <!-- Final Actions -->
          <div class="flex flex-col-reverse sm:flex-row items-center gap-3 w-full sm:w-auto">
             <button 
               @click="cancel" 
               class="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-[#333] transition-all"
             >
               Cancelar
             </button>
             <button 
               @click="cropAndSave" 
               class="w-full sm:w-auto px-8 py-3.5 sm:py-3 bg-[#005858] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-green-900/20 hover:scale-[1.02] sm:hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               <Check :size="16" stroke-width="3" />
               Cortar e Salvar
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { X, ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-vue-next'

export default {
  name: 'ImageCropModal',
  components: {
    X, ZoomIn, ZoomOut, RotateCcw, Check
  },
  props: {
    show: Boolean,
    imageSrc: String,
    aspectRatio: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          this.initCropper()
        })
      } else {
        this.destroyCropper()
      }
    }
  },
  methods: {
    initCropper() {
      if (!this.$refs.imageElement) return
      
      this.cropper = new Cropper(this.$refs.imageElement, {
        aspectRatio: this.aspectRatio,
        viewMode: 1, // Restrict the crop box to jump out of the canvas
        dragMode: 'move',
        background: false,
        autoCropArea: 0.8,
        responsive: true,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false
      })
    },
    destroyCropper() {
      if (this.cropper) {
        this.cropper.destroy()
        this.cropper = null
      }
    },
    zoom(value) {
      this.cropper?.zoom(value)
    },
    rotate(value) {
      this.cropper?.rotate(value)
    },
    cancel() {
      this.$emit('cancel')
    },
    cropAndSave() {
      if (!this.cropper) return
      
      const canvas = this.cropper.getCroppedCanvas({
        maxWidth: 2048,
        maxHeight: 2048,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      })
      
      this.$emit('confirm', canvas.toDataURL('image/png', 0.9))
    }
  }
}
</script>

<style scoped>
/* Ensure the image fills the container */
img {
  max-width: 100%;
}
</style>
