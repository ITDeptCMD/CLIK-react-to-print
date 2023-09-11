export const splitThousand = (number) => {
    if (!number && number !== 0) return "";
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  export const rupiah = (integer) => {
    if (!integer) return "Rp 0";
    return `Rp${splitThousand(integer)}`;
  };