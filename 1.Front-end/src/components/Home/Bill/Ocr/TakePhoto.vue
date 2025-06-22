<script setup lang="ts">
import { ref } from 'vue'
import { useNfsOcrStore } from '@/stores/nfsOcr'
const emit = defineEmits(['setPage'])

const nfsOcrStore = useNfsOcrStore()

// Referências
const fileInputRef = ref<HTMLInputElement | null>(null)

// Estados
const capturedImage = ref<string | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')

// Processar upload de arquivo
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    const reader = new FileReader()

    reader.onload = e => {
      if (e.target?.result) {
        capturedImage.value = e.target.result as string
      }
    }

    reader.readAsDataURL(file)
  }
}

// Processar imagem com OCR
const processImage = async () => {
  if (!capturedImage.value) return

  try {
    isLoading.value = true
    errorMessage.value = ''

    // Converter dataURL para Blob
    const response = await fetch(capturedImage.value)
    const blob = await response.blob()

    const result = await nfsOcrStore.transcribeNfImage(blob)
    if (result) emit('setPage', 'createBillManualInsertion')
    else errorMessage.value = 'Falha ao processar a imagem. Tente novamente.'
  } catch (error) {
    console.error('Erro ao processar imagem:', error)
    errorMessage.value = 'Falha ao processar a imagem. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

// Reiniciar processo
const resetCapture = () => {
  capturedImage.value = null
  errorMessage.value = ''

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
</script>

<template>
  <div class="w-full flex flex-col h-screen gap-8 items-center justify-center">
    <div class="flex flex-col gap-2 items-center justify-center">
      <h3>Envie a nota fiscal</h3>
      <p class="text-center">
        {{
          !capturedImage
            ? 'Envie uma foto da nota fiscal e nossa inteligência aritificial extrairá os dados automáticamente'
            : 'Certifique-se que os items da nota estão legíveis e que a foto possui boa iluminação'
        }}
      </p>
    </div>

    <!-- Upload de arquivo -->
    <div v-if="!capturedImage" class="mb-4">
      <div
        class="border-2 h-[400px] border-dashed w-full flex flex-col items-center justify-center border-gray-300 rounded-2xl p-6 text-center"
      >
        <input
          type="file"
          ref="fileInputRef"
          @change="handleFileUpload"
          accept="image/*"
          class="hidden group"
          id="fileInput"
        />
        <label
          for="fileInput"
          class="cursor-pointer flex flex-col gap-6 items-center justify-center"
        >
          <button
            class="h-16 w-16 shrink-0 -z-10 !rounded-full bg-secondary focus:bg-primary flex flex-col items-center justify-center button-style"
          >
            <i class="mdi mdi-plus text-3xl"></i>
          </button>
          <p class="text-center">
            Clique para selecionar uma imagem ou arraste e solte aqui
          </p>
        </label>
      </div>
    </div>

    <!-- Prévia da imagem capturada -->
    <div v-if="capturedImage" class="mb-4">
      <div class="relative w-full rounded-2xl cartoon-border overflow-hidden">
        <div
          v-if="errorMessage"
          class="text-left text-red-500 text-sm w-full absolute bottom-0 h-36 bg-gradient-to-t from-black from-50% to-transparent p-4 pt-6"
        >
          <p>{{ errorMessage }}</p>
        </div>
        <div
          class="absolute bottom-0 left-0 w-full h-full bg-secondary transition-all duration-700 ease-in-out flex items-center justify-center"
          :class="
            isLoading || nfsOcrStore.successOcr
              ? ' max-h-full'
              : 'opacity-0 max-h-0'
          "
        >
          <i
            class="mdi mb-14 text-primary text-[100px]"
            :class="
              nfsOcrStore.successOcr ? 'mdi-check' : 'mdi-loading mdi-spin'
            "
          ></i>
        </div>
        <div class="w-full h-full">
          <img :src="capturedImage" alt="Imagem capturada" class="w-full" />
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 bg-white p-2 flex gap-2 justify-between"
        >
          <button
            @click="resetCapture"
            class="px-4 py-1 bg-white button-style shrink-0 transition-all text-gray-700 !rounded-xl"
          >
            Enviar outra
          </button>
          <button
            @click="processImage"
            class="px-3 w-full py-2 flex flex-col bg-secondary focus:bg-primary items-center !ease-in-out !duration-700 justify-center button-style !rounded-full transition-all"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Processando...' : 'Usar foto' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
