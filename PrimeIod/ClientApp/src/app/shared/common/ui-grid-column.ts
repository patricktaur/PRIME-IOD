export interface UIGridColumn {
  actionType?: string;
  field?: string;
  // type?: string; //date, number, link
  type?: 'date' | 'number' | 'link' | 'bool-yes-no';

  view?: string;
  header?: string;

  hide?: boolean;
  hideGroup?: string;
  columFixed?: boolean;

  format?: string;

  width?: number;
  align?: string;

  linkField?: string;
  linkPath?: string;
  linkText?: string;

  actionField?: string;
  actionTextField?: string;
  actionCommand?: string;

  backgroundStyle?: 'one-to-five-score' | 'abcd'; //one-to-five-score,
}
