/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('TasksTable').insert([
    {TaskHeader: 'Header 1', TaskDescription: 'Descript 1', TaskEndDate: '2022-10-01 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'low', TaskStatus: 'К выполнению', TaskCreatorId: 10, TaskWorkerId: 10},
    {TaskHeader: 'Header 2', TaskDescription: 'Descript 2', TaskEndDate: '2022-10-03 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'low', TaskStatus: 'К выполнению', TaskCreatorId: 10, TaskWorkerId: 11},
    {TaskHeader: 'Header 3', TaskDescription: 'Descript 3', TaskEndDate: '2023-10-02 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'low', TaskStatus: 'Выполняется', TaskCreatorId: 10, TaskWorkerId: 12},
    {TaskHeader: 'Header 4', TaskDescription: 'Descript 4', TaskEndDate: '2022-10-03 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'middle', TaskStatus: 'Выполняется', TaskCreatorId: 11, TaskWorkerId: 10},
    {TaskHeader: 'Header 5', TaskDescription: 'Descript 5', TaskEndDate: '2022-10-02 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'middle', TaskStatus: 'Выполнена', TaskCreatorId: 11, TaskWorkerId: 12},
    {TaskHeader: 'Header 6', TaskDescription: 'Descript 6', TaskEndDate: '2023-10-06 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'middle', TaskStatus: 'Выполнена', TaskCreatorId: 11, TaskWorkerId: 11},
    {TaskHeader: 'Header 7', TaskDescription: 'Descript 7', TaskEndDate: '2023-10-06 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'middle', TaskStatus: 'Отменена', TaskCreatorId: 12, TaskWorkerId: 12},
    {TaskHeader: 'Header 8', TaskDescription: 'Descript 8', TaskEndDate: '2022-10-06 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'high', TaskStatus: 'Отменена', TaskCreatorId: 12, TaskWorkerId: 10},
    {TaskHeader: 'Header 9', TaskDescription: 'Descript 9', TaskEndDate: '2022-10-01 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'high', TaskStatus: 'К выполнению', TaskCreatorId: 12, TaskWorkerId: 11},
    {TaskHeader: 'Header 10', TaskDescription: 'Descript 10', TaskEndDate: '2023-10-01 23:55:00+05', TaskCreateDate: '2022-10-01 04:05:00+05', TaskUpdDate: '2022-10-01 04:05:00+05', TaskPrior: 'high', TaskStatus: 'Выполняется', TaskCreatorId: 10, TaskWorkerId: 10}
  ]);
};
