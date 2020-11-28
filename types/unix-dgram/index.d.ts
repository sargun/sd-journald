
type socket_type = 'unix_dgram'
declare module 'unix-dgram' {
    interface Socket {
        bind(path: string): void
        connect(remote_path: string): void
        bind(path: string): void
        send(buf: Buffer, callback?: () => any): void
        sendto(buf: Buffer, offset: number, length: number, path: string, callback?: () => any): void
        send(buf: Buffer, callback?: (err: Error) => any): void
        sendto(buf: Buffer, offset: number, length: number, path: string, callback?: (err: Error) => any): void
        close(): void
    }
    export function createSocket(t: socket_type): Socket;
}
