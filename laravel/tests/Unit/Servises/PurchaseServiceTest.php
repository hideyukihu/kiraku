<?php

namespace Tests\Unit\Services;

use App\Models\Purchase;
use App\Services\PurchaseService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PurchaseServiceTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        // テスト用のデータベースシーダーを実行
        $this->seed(PurchaseSeeder::class);
    }

    public function testCalculateAverageConsumptionDaysPerQuantity()
    {
        // テストに必要なデータを準備する
        $planId = 1;



        // PurchaseServiceのインスタンスを作成
        $service = new PurchaseService();

        // calculateAverageConsumptionDaysPerQuantityメソッドを呼び出す
        $result = $service->calculateAverageConsumptionDaysPerQuantity($planId);

        // 期待される結果と実際の結果を比較する
        // 期待される結果は、(5 + 4) / (10 + 5) = 0.625
        $this->assertEquals(0.625, $result);
    }
}
