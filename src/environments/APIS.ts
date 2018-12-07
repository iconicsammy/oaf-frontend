import { environment } from "./environment";

const apiURL: string = environment.BACKEND_URL; // this is backend

export const APIS = {
  uploadPayments: apiURL + "upload-repays/",
  reportSeasons: apiURL + 'report-seasons/'
