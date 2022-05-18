import { ChangeEvent, ReactNode, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import { CreatedTask, ModalProps } from '../../interfaces';
import { KanbanContext } from '../../contexts/KanbanContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

export interface DialogTitleProps {
    id: string;
    children?: ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const CustomizedDialogs = ({ isOpen, onClose, displayType, task, message }: ModalProps) => {
    const { updateTask } = useContext(KanbanContext);
    const [newTitle, setNewTitle] = useState(task ? task.titulo : '');
    const [newContent, setNewContent] = useState(task ? task.conteudo : '');

    const renderToView = () => (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby='task-view-title'
                open={isOpen}
                fullWidth
                maxWidth='xs'
            >
                <BootstrapDialogTitle id='task-view-title' onClose={onClose}>
                    <InfoIcon color='info' sx={{ marginBottom: -0.5, marginRight: 2 }} />
                    {task!.titulo}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{task!.conteudo}</Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );

    const renderToEdit = () => {
        const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(event.currentTarget.value);
        };
        const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
            setNewContent(event.currentTarget.value);
        };

        const onSaveNewTask = async () => {
            const newTask: CreatedTask = {
                ...task!,
                conteudo: newContent,
                titulo: newTitle
            };

            await updateTask(newTask);
            onClose();
        };

        return (
            <div>
                <BootstrapDialog
                    onClose={onClose}
                    aria-labelledby='customized-dialog-title'
                    fullWidth
                    maxWidth='sm'
                    open={isOpen}
                >
                    <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose}>
                        <EditIcon color='action' sx={{ marginBottom: -0.5, marginRight: 2 }} />
                        Edit Task
                    </BootstrapDialogTitle>

                    <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '80%' }}>
                            <TextField
                                label='Task Title'
                                placeholder='Fix layout bug'
                                onChange={onChangeTitle}
                                defaultValue={task!.titulo}
                                margin='normal'
                                fullWidth
                            />

                            <TextField
                                label='Task Content'
                                placeholder='modify file X.tsx to stop..'
                                onChange={onChangeContent}
                                defaultValue={task!.conteudo}
                                margin='normal'
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <IconButton autoFocus onClick={onSaveNewTask}>
                            <SaveIcon color='info' fontSize='inherit' />
                        </IconButton>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        );
    };

    const renderToShowError = () => (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby='task-view-title'
                open={isOpen}
                fullWidth
                maxWidth='xs'
            >
                <BootstrapDialogTitle id='task-view-title' onClose={onClose}>
                    <CancelIcon color='error' sx={{ marginBottom: -0.5, marginRight: 2 }} />
                    Error
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{message!}</Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );

    const renderToShowSuccess = () => (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby='task-view-title'
                open={isOpen}
                fullWidth
                maxWidth='xs'
            >
                <BootstrapDialogTitle id='task-view-title' onClose={onClose}>
                    <CheckCircleIcon color='success' sx={{ marginBottom: -0.5, marginRight: 2 }} />
                    Success
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{message!}</Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );

    if (displayType === 'view') {
        return renderToView();
    }

    if (displayType === 'edit') {
        return renderToEdit();
    }

    if (displayType === 'error') {
        return renderToShowError();
    }

    return renderToShowSuccess();
};

export default CustomizedDialogs;
