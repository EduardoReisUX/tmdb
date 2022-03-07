import { GetServerSideProps, GetServerSidePropsContext } from "next";
import getMovieById from "../api/getMovieById";

export default function MovieById() {
  return <>Hello</>;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { id } = query;

  // const Props = getMovieById(Number(id));

  return {
    props: {},
  };
};
