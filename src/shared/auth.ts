import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const privateRoute: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default privateRoute