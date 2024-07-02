import Cliente from "../entidades/Cliente";
import Sucursal from "../entidades/Sucursal";
import Usuario from "../entidades/Usuario";

export const localSession={
    setUsuario(key: string, value: Usuario) {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      getUsuario(key: string) {
        const userStored = sessionStorage.getItem(key);
        return userStored == null ? null : JSON.parse(userStored);
      },
      removeUsuario(key: string) {
        sessionStorage.removeItem(key);
      },
      setSucursal(key: string, value: Sucursal) {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      getSucursal(key: string) {
        const sucursalStored = sessionStorage.getItem(key);
        return sucursalStored == null ? null : JSON.parse(sucursalStored);
      },
      removeSucursal(key: string) {
        sessionStorage.removeItem(key);
      },
      setRol(key: string, value: string[]) {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      getRol(key: string) {
        const rolStored = sessionStorage.getItem(key);
        return rolStored == null ? [""] : JSON.parse(rolStored);
      },
      removeRol(key:string){
        sessionStorage.removeItem(key)
      },
      setCliente(key: string, value: Cliente) {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      getCliente(key: string) {
        const clienteStored = sessionStorage.getItem(key);
        return clienteStored == null ? null : JSON.parse(clienteStored);
      },
      removeCliente(key: string) {
        sessionStorage.removeItem(key);
      },
}