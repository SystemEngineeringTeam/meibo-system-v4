// import type { JSX } from "react";
// import { sva } from "panda/css";
// import ReactPaginate from "react-paginate";

// type Props = {
//   data: any[];
//   onPageChange: (data: { selected: number }) => void;
//   perPage: number;
// };

// const styles = sva({
//   slots: ["pagination", "pageItem", "pageLink", "activePageLink", "nextLink"],
//   base: {
//     pagination: {
//       display: "flex",
//       justifyContent: "center",
//       listStyle: "none",
//       padding: "0",
//       margin: "3svh 0 ",
//     },
//     pageItem: {
//       margin: "0 5px",
//     },
//     pageLink: {
//       display: "block",
//       width: "fit-content",
//       padding: "7px 14px",
//       borderRadius: "50px",
//       border: "1px solid #2C638B",
//       cursor: "pointer",
//       color: "mv4-primary",
//       background: "mv4-onPrimary",
//     },
//     activePageLink: {
//       display: "block",
//       width: "fit-content",
//       bg: "mv4-primary",
//       border: "1px solid #2C638B",
//       color: "#fff",
//       padding: "7px 14px",
//       borderRadius: "50px",
//       cursor: "pointer",
//     },
//     nextLink: {
//       display: "block",
//       width: "fit-content",
//       padding: "9px 16px",
//       borderRadius: "50px",
//       border: "1px solid #2C638B",
//       cursor: "pointer",
//       background: "mv4-onPrimary",
//     },
//   },
// });

// function PageNation({ data, onPageChange, perPage }: Props): JSX.Element {
//   const style = styles();
//   return (
//     <div>
//       <ReactPaginate
//         activeClassName={style.pageItem}
//         activeLinkClassName={style.activePageLink}
//         breakClassName={style.pageItem}
//         breakLabel="..."
//         breakLinkClassName={style.pageLink}
//         containerClassName={style.pagination}
//         marginPagesDisplayed={1}
//         nextClassName={style.pageItem}
//         nextLabel=">"
//         nextLinkClassName={style.nextLink}
//         onPageChange={onPageChange}
//         pageClassName={style.pageItem}
//         pageCount={Math.ceil(data.length / perPage)}
//         pageLinkClassName={style.pageLink}
//         pageRangeDisplayed={3}
//         previousClassName={style.pageItem}
//         previousLabel="<"
//         previousLinkClassName={style.nextLink}
//       />

//     </div>
//   );
// }

// export default PageNation;
