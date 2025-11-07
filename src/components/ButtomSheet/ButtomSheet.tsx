import './ButtomSheet.css'
import type { PropsWithChildren , MouseEventHandler } from 'react'

export default function ButtomSheet({
    children,
}: PropsWithChildren & { onClose?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div className='buttom-sheet'>
            {children}
        </div>
    )
}
