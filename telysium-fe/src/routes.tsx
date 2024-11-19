/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/layout';
import { lazy, Suspense } from 'react';
import RootErrorBoundary from '@/layout/RootErrorBoundary';
import Fallback from '@/layout/Fallback';
import queryClient from '@/query-client';
import { getStakeList } from './api';

const Restake = lazy(() => import('@/pages/restake'));
const Action = lazy(() => import('@/pages/action'));
const Token = lazy(() => import('@/pages/token'));
const Page404 = lazy(() => import('@/pages/404'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/restake" replace />,
  },
  {
    path: 'restake',
    errorElement: <RootErrorBoundary />,
    async loader() {
      await queryClient.prefetchQuery({
        queryKey: ['stakers'],
        queryFn: getStakeList,
      });
      return {
        title: 'Restake',
      };
    },
    children: [
      {
        index: true,
        element: (
          <Layout>
            <Suspense fallback={<Fallback />}>
              <Restake />
            </Suspense>
          </Layout>
        ),
        async loader() {
          return {
            title: 'Restake',
          };
        },
      },
      {
        path: ':token',
        element: (
          <Layout>
            <Suspense fallback={<Fallback />}>
              <Token />
            </Suspense>
          </Layout>
        ),
        loader() {
          return {
            title: '',
          };
        },
      },
      {
        path: ':action/:token',
        element: (
          <Layout>
            <Suspense fallback={<Fallback />}>
              <Action />
            </Suspense>
          </Layout>
        ),
        async loader({ params }) {
          const { action } = params;
          return {
            title: action,
          };
        },
      },
    ],
  },
  {
    path: '*',
    element: (
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Page404 />
        </Suspense>
      </Layout>
    ),
    errorElement: <RootErrorBoundary />,
    loader() {
      return {
        title: '',
      };
    },
  },
]);
