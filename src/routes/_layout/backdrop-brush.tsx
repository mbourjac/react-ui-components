import { createFileRoute } from '@tanstack/react-router';
import { BackdropBrushPage } from '../../pages/BackdropBrushPage/BackdropBrushPage';

export const Route = createFileRoute('/_layout/backdrop-brush')({
  component: BackdropBrushPage,
});
