import styles from './task.module.css'
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import {Task as TaskType} from '../../types'


interface TaskProps{
    task: TaskType
    onComplete: (id: string) => void
    onDelete: (id: string) => void
}

export function Task({ task, onComplete, onDelete }: TaskProps) {
    return (
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <AiFillCheckCircle /> : < div />}
            </button>
            <p className={task.isCompleted ? styles.taskCompleted : ""}>{task.title}</p>
            <button className={styles.delBtn} onClick={() => onDelete(task.id)}>
                <AiFillDelete size={28} />
            </button>
        </div>
    )
}
