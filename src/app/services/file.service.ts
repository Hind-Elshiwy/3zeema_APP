import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as jsPDF from "jspdf";
import "jspdf-autotable";

@Injectable({
  providedIn: "root"
})
export class FileService {
  constructor() {}

  exel(data, fileName) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    const blob: Blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    FileSaver.saveAs(blob, fileName + "-" + new Date().getTime() + ".xlsx");
  }

  pdf(head, body, name) {
    let doc = new jsPDF();
    doc.autoTable({
      head: head,
      body: body,
      margin: {
        top: 0,
        left: 0,
        rigth: 0,
        bottom: 0
      }
    });
    doc.save(name + "-" + new Date().getTime());
  }
}
