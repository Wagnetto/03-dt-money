import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function NewTransactionModal() {
  const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
  })

  type NewTransactionFormFormInputs = z.infer<typeof newTransactionFormSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: 'income' },
  })

  const { createTransaction } = useContext(TransactionsContext)

  async function handleCreateNewTransaction(
    data: NewTransactionFormFormInputs,
  ) {
    const { description, category, price, type } = data
    await createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <CloseButton>
            <X />
          </CloseButton>
          <Dialog.Title>Nova Transação</Dialog.Title>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              required
              placeholder="Descrição"
              {...register('description')}
            />
            <input
              type="number"
              required
              placeholder="Preço"
              {...register('price', { valueAsNumber: true })}
            />
            <input
              type="text"
              required
              placeholder="Categoria"
              {...register('category')}
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
