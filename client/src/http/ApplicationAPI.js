import { $authHost, $host, delet } from "./index";

export const createTask = async (task) => {
  const { data } = await $authHost.post("api/task", task);
  return data;
};

export const fetchTask = async () => {
  const { data } = await $host.get("api/task");
  return data;
};

export const createStatus = async (status) => {
  const { data } = await $authHost.post("api/status", status);
  return data;
};

export const fetchStatus = async () => {
  const { data } = await $host.get("api/status");
  return data;
};

export const createApplication = async (application) => {
  const { data } = await $authHost.post("api/application", application);
  return data;
};

export const fetchApplication = async () => {
  const { data } = await $host.get("api/application");
  return data;
};

export const fetchOneApplication = async (id) => {
  const { data } = await $host.get("api/application/" + id);
  return data;
};

export const deleteApplication = async (id) => {
  const { data } = await delet.delete("api/application/" + id);
  return data;
};

export const createDogovorInfo = async (dogovorInfo) => {
  const { data } = await $authHost.post("api/dogovorInfo", dogovorInfo);
  return data;
};

export const fetchDogovorInfo = async () => {
  const { data } = await $host.get("api/dogovorInfo");
  return data;
};

export const fetchOneDogovorInfo = async (id) => {
  const { data } = await $host.get("api/dogovorInfo/" + id);
  return data;
};

export const createKontragent = async (kontragent) => {
  const { data } = await $authHost.post("api/kontragent", kontragent);
  return data;
};

export const fetchKontragent = async () => {
  const { data } = await $host.get("api/kontragent");
  return data;
};

// создание названия маршрута
export const fetchRouteGroup = async (routeGroup) => {
  const { data } = await $authHost.post("api/routeGroup", routeGroup);
  return data;
};
//отображение маршрутов
export const fetchRouteGroupCreate = async (routeGroup) => {
  const { data } = await $authHost.get("api/routeGroup", routeGroup);
  return data;
};
//отображение одного маршрута
export const fetchOneRouteGroup = async (id) => {
  const { data } = await $host.get("api/routeGroup/" + id);
  return data;
};

// добавлене новой заявки в маршрут
export const fetchRoute = async (route) => {
  const { data } = await $authHost.post("api/route", route);
  return data;
};
//отображение всех заявок в маршруте
export const fetchRouteFetch = async (route) => {
  const { data } = await $authHost.get("api/route", route);
  return data;
};
//отображение одной заявки в маршруте
export const fetchOneRoute = async (id) => {
  const { data } = await $authHost.get("api/route/" + id);
  return data;
};
