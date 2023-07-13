import {
  GetStaticProps as NextGetStaticProps,
  GetServerSideProps as NextGetServerSideProps,
} from 'next';

export interface PageProps {
  withOutPadding?: boolean;
  withFooter?: boolean;
}

export type GetStaticProps = NextGetStaticProps<PageProps>;

export type GetServerSideProps = NextGetServerSideProps<PageProps>;
