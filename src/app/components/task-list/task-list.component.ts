import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks(); // تحميل المهام عند بدء التشغيل
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data.slice(0, 10); // جلب 10 مهام
    });
  }

  // تحديث حالة المهمة في الـ API وفي القائمة المحلية
  toggleCompletion(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      // تحديث المهمة في القائمة المحلية بعد تحديثها في الـ API
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask; // تحديث المهمة في الذاكرة
      }
    });
  }
}
