import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { X } from 'phosphor-react'

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
                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Overlay>
        </Dialog.Portal>
    )
}