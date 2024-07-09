import moment from "moment";
import { useEffect, useState } from "react";

export default function getHora() {
  const [estaEnHorario, setEstaEnHorario] = useState<boolean>(false);
  const now = moment().tz("America/Argentina/Buenos_Aires");
  useEffect(() => {
    isWithinTimeRange();
  }, []);

  const isWithinTimeRange = () => {
    const dayOfWeek = now.day(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const hour = now.hour();
    const minute = now.minute();

    // Horarios de lunes a viernes (20:00 - 00:00)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if ((hour === 17 && minute >= 0) || (hour >= 18 && hour < 24)) {
        setEstaEnHorario(true);
      } else {
        setEstaEnHorario(false);
      }
    }

    // Horarios de sábados y domingos (11:00 - 15:00 y 20:00 - 00:00)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (
        (hour === 11 && minute >= 0) ||
        (hour >= 12 && hour < 15) ||
        (hour === 20 && minute >= 0) ||
        (hour >= 0 && hour < 24)
      ) {
        setEstaEnHorario(true);
      } else {
        setEstaEnHorario(false);
      }
    }
  };
  return true;
}
