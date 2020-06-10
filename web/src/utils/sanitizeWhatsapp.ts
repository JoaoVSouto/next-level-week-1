export default function (whatsapp: string): string {
  return whatsapp.replace(/(\+|\(|\)|-|\s)/g, '').replace(/_/g, '0');
}
