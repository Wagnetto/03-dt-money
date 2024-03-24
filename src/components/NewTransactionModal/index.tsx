import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export  function NewTransactionModal(){
    return(
        <Dialog.Portal>
            <Overlay>
                <Content>
                    <CloseButton>
                        <X />
                    </CloseButton>
                    <Dialog.Title>Nova Transação</Dialog.Title>
                    <form action='' >
                        <input type="text" required placeholder='Descrição'/>
                        <input type="number" required placeholder='Preço' />
                        <input type="text" required placeholder='Categoria' />
                        <TransactionType>
                            <TransactionTypeButton variant='income'>
                                <ArrowCircleUp size={24}/>
                                Entrada
                            </TransactionTypeButton>
                            <TransactionTypeButton variant='outcome'>
                            <ArrowCircleDown size={24}/>
                                Saída
                            </TransactionTypeButton>
                        </TransactionType>
                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Overlay>
        </Dialog.Portal>
    )
}