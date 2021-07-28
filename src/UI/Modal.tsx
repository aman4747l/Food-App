import { Fragment } from 'react'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'


const Backdrop:React.FC<{onClose: () => void}> = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay:React.FC = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement:HTMLElement = document.getElementById("overlays") as HTMLElement

const Modal:React.FC<{onClose: () => void}> = props => {

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>

}

export default Modal