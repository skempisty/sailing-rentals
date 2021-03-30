import moment from 'moment';

export default function formatDateTime(timeStamp) {
  return moment.utc(timeStamp).format('MM/DD/YY');
}
