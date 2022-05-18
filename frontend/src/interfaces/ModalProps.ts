import { CreatedTask } from './Task';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    displayType: 'edit' | 'view' | 'error' | 'success';
    task?: CreatedTask;
    message?: string;
}
