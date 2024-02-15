import { makeAutoObservable } from "mobx";

export default class ApplicationCrm {
  constructor() {
    this._task = [];
    this._status = [];
    this._application = [];
    this._dogovorInfo = [];
    this._kontragent = [];

    this._selectedTask = {};
    this._selectedStatus = {};
    this._selectedKontragent = {};

    makeAutoObservable(this);
  }

  setTask(task) {
    this._task = task;
  }
  setStatus(status) {
    this._status = status;
  }
  setApplication(application) {
    this._application = application;
  }
  setDogovorInfo(dogovorInfo) {
    this._dogovorInfo = dogovorInfo;
  }
  setKontragent(kontragent) {
    this._kontragent = kontragent;
  }

  setSelectedTask(task) {
    this._selectedTask = task;
  }
  setSelectedStatus(status) {
    this._selectedStatus = status;
  }
  setSelectedKontragent(kontragent) {
    this._selectedKontragent = kontragent;
  }

  get task() {
    return this._task;
  }
  get status() {
    return this._status;
  }
  get application() {
    return this._application;
  }
  get dogovorInfo() {
    return this._dogovorInfo;
  }
  get kontragent() {
    return this._kontragent;
  }
  get selectedTask() {
    return this._selectedTask;
  }
  get selectedStatus() {
    return this._selectedStatus;
  }
  get selectedKontragent() {
    return this._selectedKontragent;
  }
}
