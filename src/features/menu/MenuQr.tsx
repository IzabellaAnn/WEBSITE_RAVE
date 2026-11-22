import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const printWidthMm = 38;
const minimumModulePitchMm = 0.4;

export function MenuQr({ value, label, recoveryMessage }: { value: string; label: string; recoveryMessage: string }) {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setImage('');
    setError(false);
    try {
      const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
      if (printWidthMm / (qr.modules.size + 4) < minimumModulePitchMm) {
        setError(true);
        return () => { active = false; };
      }
    } catch {
      setError(true);
      return () => { active = false; };
    }
    QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: 2, width: 240 })
      .then((result) => { if (active) setImage(result); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [value]);

  return <div className="menu-qr" aria-live="polite">
    {image ? <img src={image} alt={label} width="240" height="240" /> : error ? <p className="form-error">{recoveryMessage}</p> : <p className="qr-loading">{label}</p>}
    {image && <p>{label}</p>}
  </div>;
}
