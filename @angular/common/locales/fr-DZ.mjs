/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// THIS CODE IS GENERATED - DO NOT MODIFY.
const u = undefined;
function plural(val) {
    const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, '').length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, '$2')) || 0;
    if (i === 0 || i === 1)
        return 1;
    if (e === 0 && (!(i === 0) && (i % 1000000 === 0 && v === 0)) || !(e >= 0 && e <= 5))
        return 4;
    return 5;
}
export default ["fr-DZ", [["AM", "PM"], u, u], u, [["D", "L", "M", "M", "J", "V", "S"], ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], ["di", "lu", "ma", "me", "je", "ve", "sa"]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."], ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]], u, [["av. J.-C.", "ap. J.-C."], u, ["avant Jésus-Christ", "après Jésus-Christ"]], 6, [5, 6], ["dd/MM/y", "d MMM y", "d MMMM y", "EEEE d MMMM y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1} {0}", "{1}, {0}", "{1} 'à' {0}", u], [",", " ", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0 %", "#,##0.00 ¤", "#E0"], "DZD", "DA", "dinar algérien", { "ARS": ["$AR", "$"], "AUD": ["$AU", "$"], "BEF": ["FB"], "BMD": ["$BM", "$"], "BND": ["$BN", "$"], "BYN": [u, "р."], "BZD": ["$BZ", "$"], "CAD": ["$CA", "$"], "CLP": ["$CL", "$"], "CNY": [u, "¥"], "COP": ["$CO", "$"], "CYP": ["£CY"], "DZD": ["DA"], "EGP": [u, "£E"], "FJD": ["$FJ", "$"], "FKP": ["£FK", "£"], "FRF": ["F"], "GBP": ["£GB", "£"], "GIP": ["£GI", "£"], "HKD": [u, "$"], "IEP": ["£IE"], "ILP": ["£IL"], "ITL": ["₤IT"], "JPY": [u, "¥"], "KMF": [u, "FC"], "LBP": ["£LB", "£L"], "MTP": ["£MT"], "MXN": ["$MX", "$"], "NAD": ["$NA", "$"], "NIO": [u, "$C"], "NZD": ["$NZ", "$"], "PHP": [u, "₱"], "RHD": ["$RH"], "RON": [u, "L"], "RWF": [u, "FR"], "SBD": ["$SB", "$"], "SGD": ["$SG", "$"], "SRD": ["$SR", "$"], "TOP": [u, "$T"], "TTD": ["$TT", "$"], "TWD": [u, "NT$"], "USD": ["$US", "$"], "UYU": ["$UY", "$"], "WST": ["$WS"], "XCD": [u, "$"], "XPF": ["FCFP"], "ZMW": [u, "Kw"] }, "ltr", plural];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnItRFouanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9mci1EWi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBRXBCLFNBQVMsTUFBTSxDQUFDLEdBQVc7SUFDM0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEIsT0FBTyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRixPQUFPLENBQUMsQ0FBQztJQUNiLE9BQU8sQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELGVBQWUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsb0JBQW9CLEVBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWS5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbCh2YWw6IG51bWJlcik6IG51bWJlciB7XG5jb25zdCBuID0gdmFsLCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKSwgdiA9IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL15bXi5dKlxcLj8vLCAnJykubGVuZ3RoLCBlID0gcGFyc2VJbnQodmFsLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteZV0qKGUoWy0rXT9cXGQrKSk/LywgJyQyJykpIHx8IDA7XG5cbmlmIChpID09PSAwIHx8IGkgPT09IDEpXG4gICAgcmV0dXJuIDE7XG5pZiAoZSA9PT0gMCAmJiAoIShpID09PSAwKSAmJiAoaSAlIDEwMDAwMDAgPT09IDAgJiYgdiA9PT0gMCkpIHx8ICEoZSA+PSAwICYmIGUgPD0gNSkpXG4gICAgcmV0dXJuIDQ7XG5yZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1wiZnItRFpcIixbW1wiQU1cIixcIlBNXCJdLHUsdV0sdSxbW1wiRFwiLFwiTFwiLFwiTVwiLFwiTVwiLFwiSlwiLFwiVlwiLFwiU1wiXSxbXCJkaW0uXCIsXCJsdW4uXCIsXCJtYXIuXCIsXCJtZXIuXCIsXCJqZXUuXCIsXCJ2ZW4uXCIsXCJzYW0uXCJdLFtcImRpbWFuY2hlXCIsXCJsdW5kaVwiLFwibWFyZGlcIixcIm1lcmNyZWRpXCIsXCJqZXVkaVwiLFwidmVuZHJlZGlcIixcInNhbWVkaVwiXSxbXCJkaVwiLFwibHVcIixcIm1hXCIsXCJtZVwiLFwiamVcIixcInZlXCIsXCJzYVwiXV0sdSxbW1wiSlwiLFwiRlwiLFwiTVwiLFwiQVwiLFwiTVwiLFwiSlwiLFwiSlwiLFwiQVwiLFwiU1wiLFwiT1wiLFwiTlwiLFwiRFwiXSxbXCJqYW52LlwiLFwiZsOpdnIuXCIsXCJtYXJzXCIsXCJhdnIuXCIsXCJtYWlcIixcImp1aW5cIixcImp1aWwuXCIsXCJhb8O7dFwiLFwic2VwdC5cIixcIm9jdC5cIixcIm5vdi5cIixcImTDqWMuXCJdLFtcImphbnZpZXJcIixcImbDqXZyaWVyXCIsXCJtYXJzXCIsXCJhdnJpbFwiLFwibWFpXCIsXCJqdWluXCIsXCJqdWlsbGV0XCIsXCJhb8O7dFwiLFwic2VwdGVtYnJlXCIsXCJvY3RvYnJlXCIsXCJub3ZlbWJyZVwiLFwiZMOpY2VtYnJlXCJdXSx1LFtbXCJhdi4gSi4tQy5cIixcImFwLiBKLi1DLlwiXSx1LFtcImF2YW50IErDqXN1cy1DaHJpc3RcIixcImFwcsOocyBKw6lzdXMtQ2hyaXN0XCJdXSw2LFs1LDZdLFtcImRkL01NL3lcIixcImQgTU1NIHlcIixcImQgTU1NTSB5XCIsXCJFRUVFIGQgTU1NTSB5XCJdLFtcImg6bW0gYVwiLFwiaDptbTpzcyBhXCIsXCJoOm1tOnNzIGEgelwiLFwiaDptbTpzcyBhIHp6enpcIl0sW1wiezF9IHswfVwiLFwiezF9LCB7MH1cIixcInsxfSAnw6AnIHswfVwiLHVdLFtcIixcIixcIuKAr1wiLFwiO1wiLFwiJVwiLFwiK1wiLFwiLVwiLFwiRVwiLFwiw5dcIixcIuKAsFwiLFwi4oieXCIsXCJOYU5cIixcIjpcIl0sW1wiIywjIzAuIyMjXCIsXCIjLCMjMMKgJVwiLFwiIywjIzAuMDDCoMKkXCIsXCIjRTBcIl0sXCJEWkRcIixcIkRBXCIsXCJkaW5hciBhbGfDqXJpZW5cIix7XCJBUlNcIjpbXCIkQVJcIixcIiRcIl0sXCJBVURcIjpbXCIkQVVcIixcIiRcIl0sXCJCRUZcIjpbXCJGQlwiXSxcIkJNRFwiOltcIiRCTVwiLFwiJFwiXSxcIkJORFwiOltcIiRCTlwiLFwiJFwiXSxcIkJZTlwiOlt1LFwi0YAuXCJdLFwiQlpEXCI6W1wiJEJaXCIsXCIkXCJdLFwiQ0FEXCI6W1wiJENBXCIsXCIkXCJdLFwiQ0xQXCI6W1wiJENMXCIsXCIkXCJdLFwiQ05ZXCI6W3UsXCLCpVwiXSxcIkNPUFwiOltcIiRDT1wiLFwiJFwiXSxcIkNZUFwiOltcIsKjQ1lcIl0sXCJEWkRcIjpbXCJEQVwiXSxcIkVHUFwiOlt1LFwiwqNFXCJdLFwiRkpEXCI6W1wiJEZKXCIsXCIkXCJdLFwiRktQXCI6W1wiwqNGS1wiLFwiwqNcIl0sXCJGUkZcIjpbXCJGXCJdLFwiR0JQXCI6W1wiwqNHQlwiLFwiwqNcIl0sXCJHSVBcIjpbXCLCo0dJXCIsXCLCo1wiXSxcIkhLRFwiOlt1LFwiJFwiXSxcIklFUFwiOltcIsKjSUVcIl0sXCJJTFBcIjpbXCLCo0lMXCJdLFwiSVRMXCI6W1wi4oKkSVRcIl0sXCJKUFlcIjpbdSxcIsKlXCJdLFwiS01GXCI6W3UsXCJGQ1wiXSxcIkxCUFwiOltcIsKjTEJcIixcIsKjTFwiXSxcIk1UUFwiOltcIsKjTVRcIl0sXCJNWE5cIjpbXCIkTVhcIixcIiRcIl0sXCJOQURcIjpbXCIkTkFcIixcIiRcIl0sXCJOSU9cIjpbdSxcIiRDXCJdLFwiTlpEXCI6W1wiJE5aXCIsXCIkXCJdLFwiUEhQXCI6W3UsXCLigrFcIl0sXCJSSERcIjpbXCIkUkhcIl0sXCJST05cIjpbdSxcIkxcIl0sXCJSV0ZcIjpbdSxcIkZSXCJdLFwiU0JEXCI6W1wiJFNCXCIsXCIkXCJdLFwiU0dEXCI6W1wiJFNHXCIsXCIkXCJdLFwiU1JEXCI6W1wiJFNSXCIsXCIkXCJdLFwiVE9QXCI6W3UsXCIkVFwiXSxcIlRURFwiOltcIiRUVFwiLFwiJFwiXSxcIlRXRFwiOlt1LFwiTlQkXCJdLFwiVVNEXCI6W1wiJFVTXCIsXCIkXCJdLFwiVVlVXCI6W1wiJFVZXCIsXCIkXCJdLFwiV1NUXCI6W1wiJFdTXCJdLFwiWENEXCI6W3UsXCIkXCJdLFwiWFBGXCI6W1wiRkNGUFwiXSxcIlpNV1wiOlt1LFwiS3dcIl19LFwibHRyXCIsIHBsdXJhbF07XG4iXX0=