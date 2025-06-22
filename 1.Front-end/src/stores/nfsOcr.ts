import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TextractClient, AnalyzeExpenseCommand } from '@aws-sdk/client-textract'
import { Item } from './bill'
import { useBillStore } from './bill'

export interface NfsItem {
  name: string
  quantity: number
  unitPrice: number
  price: number
}

export const useNfsOcrStore = defineStore('NfsOcrStore', () => {
  const billStore = useBillStore()
  const loadingOcr = ref(false)
  const ocrError = ref<Error | null>(null)
  const successOcr = ref(false)

  // Inicializa o cliente Textract
  const textractClient = new TextractClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  })

  const normalizeMonetaryValue = (value: string | undefined): number => {
    if (!value) return 0

    const normalizedValue = value
      .replace(/[R$]/g, '')
      .replace(/\s/g, '')
      .replace(',', '.')

    return parseFloat(normalizedValue) || 0
  }

  const transcribeNfImage = async (
    imageFile: File | string | Blob
  ): Promise<boolean> => {
    try {
      loadingOcr.value = true
      ocrError.value = null

      let imageBytes: Uint8Array
      if (imageFile instanceof File || imageFile instanceof Blob) {
        const arrayBuffer = await imageFile.arrayBuffer()
        imageBytes = new Uint8Array(arrayBuffer)
      } else {
        const response = await fetch(imageFile)
        const arrayBuffer = await response.arrayBuffer()
        imageBytes = new Uint8Array(arrayBuffer)
      }

      const command = new AnalyzeExpenseCommand({
        Document: {
          Bytes: imageBytes,
        },
      })

      const result = await textractClient.send(command)

      console.log('textract result', result)

      result.ExpenseDocuments?.forEach(document => {
        document.LineItemGroups?.forEach(group => {
          group.LineItems?.forEach(item => {
            if (item.LineItemExpenseFields) {
              const fields = item.LineItemExpenseFields.reduce(
                (acc, field) => {
                  if (field.Type?.Text && field.ValueDetection?.Text) {
                    acc[field.Type.Text] = field.ValueDetection.Text
                  }
                  return acc
                },
                {} as Record<string, string>
              )
              const billItem: Item = {
                id: '',
                name: fields['ITEM'] || '',
                quantity: normalizeMonetaryValue(fields['QUANTITY']),
                totalPrice: normalizeMonetaryValue(fields['PRICE']),
                price: normalizeMonetaryValue(fields['UNIT_PRICE']),
              }
              billStore.addItem(billItem)
            }
          })
        })
      })

      const servifeFee = normalizeMonetaryValue(
        result.ExpenseDocuments?.[0]?.SummaryFields?.find(
          field => field.Type?.Text === 'SERVICE_CHARGE'
        )?.ValueDetection?.Text
      )

      console.log('servifeFee', servifeFee)

      if (servifeFee) {
        billStore.bill.aditionalCosts.tip = servifeFee
      }
      console.log('billStore.bill', billStore.bill)
      successOcr.value = true
      return true
    } catch (error) {
      console.error('Erro ao transcrever imagem', error)
      ocrError.value = error as Error
      return false
    } finally {
      loadingOcr.value = false
    }
  }

  return {
    loadingOcr,
    ocrError,
    transcribeNfImage,
    successOcr,
  }
})
