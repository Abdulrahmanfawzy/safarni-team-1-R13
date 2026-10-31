declare module "qrcode" {
  export type QRCodeOptions = {
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    width?: number;
  };

  export type QRCodeSymbol = {
    modules: {
      size: number;
      get(row: number, column: number): number;
    };
  };

  export function create(text: string, options?: QRCodeOptions): QRCodeSymbol;
  export function toDataURL(text: string, options?: QRCodeOptions): Promise<string>;

  const QRCode: {
    create: typeof create;
    toDataURL: typeof toDataURL;
  };

  export default QRCode;
}
