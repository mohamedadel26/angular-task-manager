import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskToggle = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  toggleTaskCompletion() {
    this.task.completed = !this.task.completed;
    this.taskToggle.emit(this.task);

    // تحديث المهمة في الـ API
    this.taskService.updateTask(this.task).subscribe();
  }
}
