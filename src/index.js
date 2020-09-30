import './scss/index.scss'
import {Exсel} from '@/components/exel/Exсel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

const excel = new Exсel('#app', {
    components: [Header, Toolbar, Formula, Table]
})

excel.render()

