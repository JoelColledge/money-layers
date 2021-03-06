import * as csvparse from 'csv-parse';

import {Account} from '../../../../common-types/structure';
import {Transaction, Entry} from '../../../../common-types/transaction';
import StructureDao from '../dao/structure-dao';
import TransactionDao from '../dao/transaction-dao';


namespace ImportService {

    function envelopeToAccountName(envelope: string): string {
        if (envelope === '[Unallocated]') {
            return 'unallocated';
        }
        return envelope;
    }

    function accountByName(accounts: Account[], name: string): Account {
        let account: Account = accounts.find((account) => account.name === name);
        if (!account) {
            throw new Error('No account ' + name);
        }
        return account;
    }

    function parseAmount(amountString: string): number {
        return Math.round(parseFloat(amountString.replace(',', '')) * 100);
    }

    function detailEntry(accounts: Account[], detailString: string): Entry {
        let detailParts: string[] = detailString.split('|');
        let amount: number = parseAmount(detailParts[1]);
        return new Entry(accountByName(accounts, envelopeToAccountName(detailParts[0]))._id, amount);
    }

    function goodbudgetLineTransaction(accounts: Account[], line: {[key:string]:any}): Transaction {
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

        // Special line
        if (notes.startsWith('s')) {
            console.log(line);
            return null;
        }

        if (envelope) {
            let accountName = envelopeToAccountName(envelope);

            if (!name) {
                // Envelope transfer
                // These appear as 2 lines in the CSV, so just create separate
                // transactions into and out of Buffer for them
                return new Transaction(
                    undefined,
                    notes,
                    '',
                    date.toISOString(),
                    [
                        new Entry(accountByName(accounts, accountName)._id, amount),
                        new Entry(accountByName(accounts, 'Buffer')._id, -amount)
                    ]
                )
            }

            // Normal expense
            return new Transaction(
                undefined,
                name,
                notes,
                date.toISOString(),
                [
                    new Entry(accountByName(accounts, accountName)._id, amount),
                    new Entry(accountByName(accounts, accountName + ' expenses')._id, -amount),
                    new Entry(accountByName(accounts, notes.startsWith('c') ? 'Cash' : 'Bank account')._id, amount)
                ]
            )
        } else {
            // Envelope fill
            let entries: Entry[] = details.split('||')
                .map((detailString) => detailEntry(accounts, detailString));

            entries.push(new Entry(accountByName(accounts, 'unallocated')._id, -amount))

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
        StructureDao.get().then(structure => {
            csvparse(csv, { columns: true }, (err, output) => {
                if (err) {
                    console.error(err);
                } else {
                    goodbudgetArrayImport(structure.accounts, output);
                }
            })
        });
    }
}

export default ImportService;
