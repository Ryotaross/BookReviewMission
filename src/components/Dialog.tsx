import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogInterface(props: any){
  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    {props.type === 'create'?
      <>
      <DialogTitle id="alert-dialog-title">
        以下の内容で{props.button}しますか？
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          書籍タイトル：{props.review.title}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          書籍URL：{props.review.url}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          あらすじ：{props.review.detail}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          レビュー：{props.review.review}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button onClick={props.handleSubmit} autoFocus>
          {props.button}
        </Button>
      </DialogActions>
      </>
    :
      <>
        <DialogTitle id="alert-dialog-title">
          本当に削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            削除するともとには戻せません
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>キャンセル</Button>
          <Button onClick={props.handleSubmit} autoFocus color='error'>
            削除
          </Button>
        </DialogActions>
      </>
    }
    </Dialog>
  )
}

export default DialogInterface