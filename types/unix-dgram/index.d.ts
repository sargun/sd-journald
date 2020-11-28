
type socket_type = 'unix_dgram'
declare module 'unix-dgram' {
    interface Socket {
        bind(path: string): void
        connect(remote_path: string): void
        send(buf: Buffer, callback?: () => void): void
        send(buf: Buffer, callback?: (err: Error) => void): void
        sendto(buf: Buffer, offset: number, length: number, path: string, callback?: () => void): void
        sendto(buf: Buffer, offset: number, length: number, path: string, callback?: (err: Error) => void): void
        close(): void
    }
    export function createSocket(t: socket_type): Socket;
}
