import * as csvparse from 'csv-parse';

import {Account} from '../../../../common-types/account';
import {Transaction, Entry} from '../../../../common-types/transaction';
import AccountDao from '../dao/account-dao';
import TransactionDao from '../dao/transaction-dao';


namespace ImportService {

    function accountByName(accounts: Account[], name: string): Account {
        let account: Account = accounts.find((account) => account.name === name);
        if (!account) {
            throw new Error('No account ' + name);
        }
        return account;
    }

    function parseAmount(amountString: string): number {
        return parseFloat(amountString.replace(',', '')) * 100;
    }

    function detailEntry(accounts: Account[], detailString: string): Entry {
        let detailParts: string[] = detailString.split('|');
        let amount: number = parseAmount(detailParts[1]);
        return new Entry(accountByName(accounts, detailParts[0])._id, amount);
    }

    function goodbudgetLineTransaction(accounts: Account[], line: {[key:string]:any}): Transaction {
        console.log('Processing line', line);

        let dateString: string = line['Date'];
        let envelope: string = line['Envelope'];
        let name: string = line['Name'];
        let notes: string = line['Notes'];
        let amountString: string = line['Amount'];
        let details: string = line['Details'];

        let dateParts: string[] = dateString.split('/');
        let date: Date = new Date(Date.UTC(
            parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0])
        ));

        let amount: number = parseAmount(amountString);

        if (envelope) {
            if (!name) {
                console.log('Unnamed line', line);
                return null;
            }

            return new Transaction(
                undefined,
                name,
                notes,
                date.toISOString(),
                [
                    new Entry(accountByName(accounts, envelope)._id, amount),
                    new Entry(accountByName(accounts, envelope + ' expenses')._id, -amount),
                    new Entry(accountByName(accounts, 'a-Current')._id, amount), // TODO Cash
                    new Entry(accountByName(accounts, 'a-World')._id, -amount)
                ]
            )
        } else {
            let entries: Entry[] = details.split('||')
                .map((detailString) => detailEntry(accounts, detailString));

            entries.push(new Entry(accountByName(accounts, '[Unallocated]')._id, -amount))

            return new Transaction(
                undefined,
                name,
                notes,
                date.toISOString(),
                entries
            )
        }
    }

    function goodbudgetArrayImport(accounts: Account[], data: Array<{[key:string]:any}>): void {
        data.map((line) => goodbudgetLineTransaction(accounts, line))
            .map((transaction) => {
                if (transaction) {
                    TransactionDao.createTransaction(transaction);
                }
            });
    }

    export function goodbudgetImport(csv: string) {
        AccountDao.getAll().then((accounts) => {
            csvparse(csv, { columns: true }, (err, output) => {
                if (err) {
                    console.error(err);
                } else {
                    goodbudgetArrayImport(accounts, output);
                }
            })
        });
    }
}

export default ImportService;
