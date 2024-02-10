import styles from './tasks.module.css';
import { Task } from '../task';
import { Task as TaskType} from '../../types';

interface TasksProps {
    tasks: TaskType[]
    onComplete: (id: string) => void
    onDelete: (id: string) => void
}
export function Tasks({ tasks, onComplete, onDelete }: TasksProps) {

    const tasksQuantity = tasks.length
    const completedTask = tasks.filter(task => task.isCompleted).length

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Created Task</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.completed}>Completed Tasks</p>
                    <span>{completedTask} of {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {tasks.map(task => (
                    <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
                ))}
            </div>
        </section>
    )
}