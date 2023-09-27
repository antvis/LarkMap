import { CSSProperties } from 'react';

export interface AdministrativeAreaSelectProps {
  cityClick: (item: any) => void;
  onSelectChange: (item: any) => void;
  className?: string;
  popoverClassName?: string;
  style?: CSSProperties;
}
