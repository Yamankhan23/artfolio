
import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { Paginator } from "primereact/paginator";
import type { Artwork, ArtworkResponse } from "./types";

export const ArtworkTable = () => {
    const rowsPerPage = 12;

    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
    const [rowsToSelect, setRowsToSelect] = useState(0);
    const [loading, setLoading] = useState(false);

    const overlayRef = useRef<OverlayPanel>(null);

    const fetchArtworksPage = async (pageNumber: number, limit: number) => {
        const res = await fetch(
            `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${limit}`
        );
        const data: ArtworkResponse = await res.json();
        return data;
    };

    const loadPage = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await fetchArtworksPage(pageNumber, rowsPerPage);
            setArtworks(data.data || []);
            setTotalRecords(data.pagination?.total ?? 0);
        } catch (err) {
            console.error(err);
            setArtworks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage(page);
    }, [page]);

    const onSelectionChange = (e: Artwork[]) => {
        const currentPageIds = new Set(artworks.map((a) => a.id));
        const others = selectedArtworks.filter((a) => !currentPageIds.has(a.id));
        setSelectedArtworks([...others, ...e]);
    };

    const selectFirstNGlobal = async (n: number) => {
        if (!n || n <= 0) return;
        let merged = [...selectedArtworks];
        let currentPage = 1;
        const limit = 100;

        while (merged.length < n) {
            const data = await fetchArtworksPage(currentPage, limit);
            if (!data?.data || data.data.length === 0) break;
            for (const item of data.data) {
                if (!merged.find((a) => a.id === item.id) && merged.length < n) merged.push(item);
            }
            currentPage++;
        }
        setSelectedArtworks(merged);
    };

    return (
        <div style={{ padding: 16, borderRadius: 20 }}>
            <OverlayPanel ref={overlayRef} dismissable>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 150 }}>
                    <InputNumber value={rowsToSelect} onValueChange={(e) => setRowsToSelect(e.value ?? 0)} min={1} max={totalRecords} />
                    <Button label="Submit" onClick={() => { selectFirstNGlobal(rowsToSelect); overlayRef.current?.hide(); }} />
                </div>
            </OverlayPanel>

            <DataTable
                value={artworks}
                loading={loading}
                selectionMode="multiple"
                selection={selectedArtworks}
                onSelectionChange={(e) => onSelectionChange(e.value as Artwork[])}
                dataKey="id"
                responsiveLayout="scroll"
            >
                <Column
                    selectionMode="multiple"
                    header={
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span></span>
                            <Button icon="pi pi-chevron-down" className="p-button-text p-button-sm" onClick={(e) => overlayRef.current?.toggle(e)} />
                        </div>
                    }
                    headerStyle={{ width: 48 }}
                />
                <Column field="title" header="Title" />
                <Column field="place_of_origin" header="Place of Origin" />
                <Column field="artist_display" header="Artist" />
                <Column field="inscriptions" header="Inscriptions" />
                <Column field="date_start" header="Start Year" />
                <Column field="date_end" header="End Year" />
            </DataTable>

            <Paginator first={(page - 1) * rowsPerPage} rows={rowsPerPage} totalRecords={totalRecords} onPageChange={(e) => setPage((e.page ?? 0) + 1)} />
        </div>
    );
};
