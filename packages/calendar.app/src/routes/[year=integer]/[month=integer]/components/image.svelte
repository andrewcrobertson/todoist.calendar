<script lang="ts">
  import { lowerCase } from 'lodash-es';
  import img01Url from '../assets/01.jpg';
  import img02Url from '../assets/02.jpg';
  import img03Url from '../assets/03.jpg';
  import img04Url from '../assets/04.jpg';
  import img05Url from '../assets/05.jpg';
  import img06Url from '../assets/06.png';
  import img07Url from '../assets/07.png';
  import img08Url from '../assets/08.jpg';
  import img09Url from '../assets/09.jpg';
  import img10Url from '../assets/10.jpg';
  import img11Url from '../assets/11.png';
  import img12Url from '../assets/12.jpg';
  export let month: string;

  const getImageUrl = (month: string) => {
    if (month === 'january') return img01Url;
    if (month === 'february') return img02Url;
    if (month === 'march') return img03Url;
    if (month === 'april') return img04Url;
    if (month === 'may') return img05Url;
    if (month === 'june') return img06Url;
    if (month === 'july') return img07Url;
    if (month === 'august') return img08Url;
    if (month === 'september') return img09Url;
    if (month === 'october') return img10Url;
    if (month === 'november') return img11Url;
    if (month === 'december') return img12Url;
  };

  const imgUrl = getImageUrl(lowerCase(month));
</script>

<img class="h-48 mx-auto" src={imgUrl} alt={month} />
