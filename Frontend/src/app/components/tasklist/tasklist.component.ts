import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskaddService } from 'src/app/services/taskadd.service';



@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  userDetails: { username: string } | null = null;
  newVeryUrgentname:string="";
  newVeryUrgentdescrip:string="";
  newVeryUrgentowner:string="";
  newVeryUrgentDate:Date|undefined;
  newNormalname:string="";
  newNormaldescrip:string="";
  newNormalowner:string="";
  newNormalDate:Date|undefined;
  newUrgentname:string="";
  newUrgentdescrip:string="";
  newUrgentowner:string="";
  newUrgentDate:Date|undefined;

  
  Normal: {id: number,etat: string,titre: string, description: string ,proprietaire: string,date_fin: Date }[]=[] ;
  VeryUrgent: { id: number,etat: string,titre: string, description: string ,proprietaire: string,date_fin: Date}[]=[];
  Urgent: { id: number,etat: string,titre: string, description: string ,proprietaire: string,date_fin: Date}[]=[];
  alltasks: { id: number,etat: string,titre: string, description: string ,proprietaire: string,date_fin: Date}[]=[];
  constructor(private taskAddService:TaskaddService) { 
    
  }
 
  adddDoneTasks(): void {
    if (this.newVeryUrgentname.trim()!=="" && this.newVeryUrgentdescrip.trim()!=="" && this.newVeryUrgentowner.trim()!=="") {
      this.taskAddService.addTask({
        etat: "Very Urgent",
        titre: this.newVeryUrgentname,
        description: this.newVeryUrgentdescrip,
        proprietaire: this.newVeryUrgentowner,
        date_fin: this.newVeryUrgentDate,
        username: this.userDetails.username
      }).subscribe(res => {
        this.taskAddService.getActiveUserDetails().subscribe(
          (data) => {
            this.userDetails = data;
            this.taskAddService.getAllTasks(this.userDetails.username).subscribe(
              (res) => {
                this.alltasks = res;
                this.VeryUrgent.push(this.alltasks[this.alltasks.length-1]);
                
              },
              (error) => {
                console.error('Error fetching tasks:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
        console.log(res);
      });
      this.newVeryUrgentDate=undefined;
      this.newVeryUrgentname = "";
      this.newVeryUrgentdescrip = "";
      this.newVeryUrgentowner = "";
      
    }
  }
  
  adddInprogressTasks():void{
    if (this.newUrgentname.trim() !== "" && this.newUrgentdescrip.trim() !== "" && this.newUrgentowner.trim() !== "") {
      this.taskAddService.addTask({
        etat: "Urgent",
        titre: this.newUrgentname,
        description: this.newUrgentdescrip,
        proprietaire: this.newUrgentowner,
        date_fin: this.newUrgentDate,
        username: this.userDetails.username
      }).subscribe(res => {
        this.taskAddService.getActiveUserDetails().subscribe(
          (data) => {
            this.userDetails = data;
            this.taskAddService.getAllTasks(this.userDetails.username).subscribe(
              (res) => {
                this.alltasks = res;
                this.alltasks = res;
                this.Urgent.push(this.alltasks[this.alltasks.length-1]);
              },
              (error) => {
                console.error('Error fetching tasks:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
        console.log(res);
      });
      this.newUrgentDate=undefined;
      this.newUrgentname = "";
      this.newUrgentdescrip = "";
      this.newUrgentowner = "";
    }
  }
  adddToDoTasks():void{
    if (this.newNormalname.trim() !== "" && this.newNormaldescrip.trim() !== "" && this.newNormalowner.trim() !== "") {
      this.taskAddService.addTask({
        etat: "Normal",
        titre: this.newNormalname,
        description: this.newNormaldescrip,
        proprietaire: this.newNormalowner,
        date_fin: this.newNormalDate,
        username: this.userDetails.username
      }).subscribe(res => {
        this.taskAddService.getActiveUserDetails().subscribe(
          (data) => {
            this.userDetails = data;
            this.taskAddService.getAllTasks(this.userDetails.username).subscribe(
              (res) => {
                this.alltasks = res;
                this.Normal.push(this.alltasks[this.alltasks.length-1]);
              },
              (error) => {
                console.error('Error fetching tasks:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
        console.log(res);
      });
      this.newNormalDate=undefined;
      this.newNormalname = "";
      this.newNormaldescrip = "";
      this.newNormalowner = "";
    }
  }
  ngOnInit(): void {
    this.taskAddService.getActiveUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.taskAddService.getAllTasks(this.userDetails.username).subscribe(
          (res) => {
            this.alltasks = res;
            for (let task of this.alltasks) {
              if (task.etat === 'Very Urgent') {
                this.VeryUrgent.push(task);
              }
              if (task.etat === 'Normal') {
                this.Normal.push(task);
              }
              if (task.etat === 'Urgent') {
                this.Urgent.push(task);
              }
            }
          },
          (error) => {
            console.error('Error fetching tasks:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  
 

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  lists = [
    {ala:this.Normal,nom:"P1: Traitement immédiat"},
    {ala:this.Urgent,nom:"P2: Traitement retardé"},
    {ala:this.VeryUrgent,nom:"P3: Traitement minimal"},
  ]
  

 
}