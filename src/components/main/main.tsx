import { FC } from "react";
import { Route, Routes } from "react-router";
import EmptyPage from "../../pages/empty-page";
import CallsPage from "../../pages/calls-page";
import styles from './main.module.scss';

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path='/results' element={<EmptyPage />} />
        <Route path='/orders' element={<EmptyPage />} />
        <Route path='/messages' element={<EmptyPage />} />
        <Route path='/calls' element={<CallsPage />} />
        <Route path='/counterparties' element={<EmptyPage />} />
        <Route path='/documentation' element={<EmptyPage />} />
        <Route path='/performers' element={<EmptyPage />} />
        <Route path='/reports' element={<EmptyPage />} />
        <Route path='/knowledgeBase' element={<EmptyPage />} />
        <Route path='/settings' element={<EmptyPage />} />
      </Routes>
    </main>
  )
}

export default Main